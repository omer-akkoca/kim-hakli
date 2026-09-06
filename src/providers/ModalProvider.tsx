import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { ButtonAction, ModalContext, ShowOptions } from '@/src/contexts';
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pressable,
  VStack,
} from '@/components/ui';
import { AppText } from '@/src/components';

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalQueue, setModalQueue] = useState<ShowOptions[]>([]);
  const [isClosing, setIsClosing] = useState(false);

  const closingRef = useRef(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Kuyruktaki ilk modal ekranda gösterilir.
  const options = modalQueue[0] ?? null;
  const visible = Boolean(options) && !isClosing;

  const show = useCallback((opts: ShowOptions) => {
    setModalQueue((previousQueue) => [...previousQueue, opts]);
  }, []);

  const hide = useCallback(() => {
    if (closingRef.current) {
      return;
    }

    closingRef.current = true;
    setIsClosing(true);

    closeTimerRef.current = setTimeout(() => {
      setModalQueue((previousQueue) => previousQueue.slice(1));
      setIsClosing(false);
      closingRef.current = false;
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const handleButtonPress = useCallback(
    (btn: ButtonAction) => {
      if (!options?.noClosable) {
        hide();
      }

      btn.onPress?.();
    },
    [hide, options?.noClosable],
  );

  const hasCustomContent = Boolean(options?.content);

  return (
    <ModalContext.Provider value={{ show, hide }}>
      {children}

      <Modal isOpen={visible} onClose={options?.noClosable ? undefined : hide}>
        <ModalBackdrop className="bg-modal-backdrop" />

        {hasCustomContent ? (
          <ModalContent className="w-full border-0 bg-transparent p-0">
            <ModalBody className="w-full" style={{ padding: 0, margin: 0 }}>
              {options?.content}
            </ModalBody>
          </ModalContent>
        ) : (
          <ModalContent
            className="w-5/6 rounded-4xl border border-white/10 bg-background-500"
            style={styles.modalShadow}
          >
            <>
              <ModalHeader>
                <AppText
                  size={22}
                  lineHeight={26}
                  weight={700}
                  className="-tracking-2 mx-auto w-11/12 text-center text-modal-title"
                >
                  {options?.title}
                </AppText>
              </ModalHeader>

              <ModalBody>
                {options?.subtitle ? (
                  <AppText
                    size={14}
                    weight={400}
                    className="-tracking-2 mx-auto w-11/12 text-center text-modal-desc"
                  >
                    {options.subtitle}
                  </AppText>
                ) : null}
              </ModalBody>

              {options?.buttons?.length ? (
                <ModalFooter>
                  <VStack space="sm" className="w-full">
                    {options.buttons.map((btn, index) => {
                      const isPrimary = index === 0;

                      return (
                        <Pressable
                          key={`${btn.label}-${index}`}
                          onPress={() => handleButtonPress(btn)}
                          className={`h-modal-button w-full items-center justify-center rounded-[18px] border ${
                            isPrimary
                              ? 'border-transparent bg-primary-500'
                              : 'border-white/10 bg-white/5'
                          }`}
                        >
                          <AppText
                            weight={700}
                            className={isPrimary ? 'text-modal-title' : 'text-loginText'}
                          >
                            {btn.label}
                          </AppText>
                        </Pressable>
                      );
                    })}
                  </VStack>
                </ModalFooter>
              ) : null}
            </>
          </ModalContent>
        )}
      </Modal>
    </ModalContext.Provider>
  );
}

const styles = StyleSheet.create({
  modalShadow:
    Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 24,
          },
          shadowOpacity: 0.35,
          shadowRadius: 35,
        }
      : {
          boxShadow: '0 24px 70px rgba(0,0,0,0.45)',
        },
});
