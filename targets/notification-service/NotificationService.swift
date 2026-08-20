import Foundation
import UserNotifications

class NotificationService: UNNotificationServiceExtension {
  private var contentHandler: ((UNNotificationContent) -> Void)?
  private var bestAttemptContent: UNMutableNotificationContent?

  override func didReceive(
    _ request: UNNotificationRequest,
    withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void
  ) {
    self.contentHandler = contentHandler

    guard let bestAttemptContent = request.content.mutableCopy()
      as? UNMutableNotificationContent
    else {
      contentHandler(request.content)
      return
    }

    self.bestAttemptContent = bestAttemptContent

    guard
      let body = request.content.userInfo["body"] as? [String: Any],
      let richContent = body["_richContent"] as? [String: Any],
      let imageUrlString = richContent["image"] as? String,
      let imageUrl = URL(string: imageUrlString)
    else {
      contentHandler(bestAttemptContent)
      return
    }

    downloadAndAttachImage(
      from: imageUrl,
      to: bestAttemptContent,
      completion: contentHandler
    )
  }

  private func downloadAndAttachImage(
    from url: URL,
    to content: UNMutableNotificationContent,
    completion: @escaping (UNNotificationContent) -> Void
  ) {
    URLSession.shared.downloadTask(with: url) { temporaryUrl, _, _ in
      guard let temporaryUrl else {
        completion(content)
        return
      }

      let destinationUrl = URL(fileURLWithPath: NSTemporaryDirectory())
        .appendingPathComponent("\(UUID().uuidString).jpg")

      do {
        try? FileManager.default.removeItem(at: destinationUrl)
        try FileManager.default.moveItem(at: temporaryUrl, to: destinationUrl)

        let attachment = try UNNotificationAttachment(
          identifier: "story-cover",
          url: destinationUrl,
          options: nil
        )

        content.attachments = [attachment]
      } catch {
        print("Notification image attachment error: \(error.localizedDescription)")
      }

      completion(content)
    }.resume()
  }

  override func serviceExtensionTimeWillExpire() {
    if let contentHandler, let bestAttemptContent {
      contentHandler(bestAttemptContent)
    }
  }
}