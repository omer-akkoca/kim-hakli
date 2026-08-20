import {
  ImageMagick,
  initializeImageMagick,
  MagickFormat,
} from 'npm:@imagemagick/magick-wasm@^0';

const wasmBytes = await Deno.readFile(
  new URL('magick.wasm', import.meta.resolve('npm:@imagemagick/magick-wasm@^0')),
);

await initializeImageMagick(wasmBytes);

const MAX_WIDTH = 500;
const JPEG_QUALITY = 65;

const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );

Deno.serve(async (request) => {
  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const url = new URL(request.url);
  const storyId = url.searchParams.get('storyId');

  if (!storyId || !isUuid(storyId)) {
    return new Response('Geçersiz storyId.', { status: 400 });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');

  if (!supabaseUrl) {
    return new Response('SUPABASE_URL bulunamadı.', { status: 500 });
  }

  const coverUrl =
    `${supabaseUrl}/storage/v1/object/public/story-covers/${storyId}.webp`;

  try {
    const coverResponse = await fetch(coverUrl);

    if (!coverResponse.ok) {
      return new Response('Kapak görseli bulunamadı.', {
        status: coverResponse.status,
      });
    }

    const sourceBytes = new Uint8Array(await coverResponse.arrayBuffer());

    const jpegBytes = ImageMagick.read(sourceBytes, (image) => {
      if (image.width > MAX_WIDTH) {
        const targetHeight = Math.round((image.height * MAX_WIDTH) / image.width);

        image.resize(MAX_WIDTH, targetHeight);
      }

      image.quality = JPEG_QUALITY;

      return image.write(MagickFormat.Jpeg, (data) => data);
    });

    return new Response(jpegBytes, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Notification cover conversion error:', error);

    return new Response('Görsel dönüştürülemedi.', { status: 500 });
  }
});