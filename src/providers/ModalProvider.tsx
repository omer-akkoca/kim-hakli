import React, { useCallback, useState } from 'react';
import { ButtonAction, ModalContext, ShowOptions } from '@/src/contexts';
import { Box, Modal, ModalBackdrop, ModalContent, Pressable, VStack } from '@/components/ui';
import { AppText } from '../components';

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ShowOptions | null>(null);

  const show = useCallback((opts: ShowOptions) => {
    setOptions(opts);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
    setTimeout(() => setOptions(null), 300);
  }, []);

  const handleButtonPress = useCallback(
    (btn: ButtonAction) => {
      hide();
      btn.onPress?.();
    },
    [hide],
  );

  return (
    <ModalContext.Provider value={{ show }}>
      {children}
      <Modal isOpen={visible} onClose={hide}>
        <ModalBackdrop className="bg-modal-backdrop" />
        <ModalContent
          className="bg-background-500 border border-white/10 rounded-4xl w-5/6"
          style={{ boxShadow: '0 24px 70px rgba(0,0,0,0.45)' }}
        >
          <Box className="gap-4">
            {/* Title */}
            <AppText
              size={22}
              lineHeight={26}
              weight={700}
              className="-tracking-2 text-modal-title text-center w-11/12 mx-auto"
            >
              {options?.title}
            </AppText>

            {/* Description */}
            {options?.subtitle ? (
              <AppText
                size={14}
                weight={400}
                className="-tracking-2 text-modal-desc text-center w-11/12 mx-auto"
              >
                {options?.subtitle}
              </AppText>
            ) : null}

            {/* Buttons */}
            {options?.buttons && options.buttons.length > 0 ? (
              <VStack space="sm">
                {options.buttons.map((btn, index) => {
                  const isFirst = index === 0;
                  return (
                    <Pressable
                      key={index.toString()}
                      onPress={() => handleButtonPress(btn)}
                      className={`w-full h-modal-button items-center border justify-center rounded-[18px] ${isFirst ? 'bg-primary-500 border-transparent' : 'bg-white/5 border-white/10'}`}
                    >
                      <AppText
                        weight={700}
                        className={`${isFirst ? 'text-modal-title' : 'text-loginText'}`}
                      >
                        {btn.label}
                      </AppText>
                    </Pressable>
                  );
                })}
              </VStack>
            ) : null}
          </Box>
        </ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
}
