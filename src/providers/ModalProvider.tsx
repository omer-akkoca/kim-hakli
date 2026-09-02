import React, { useCallback, useState } from 'react';
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

    setTimeout(() => {
      setOptions(null);
    }, 300);
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
          <ModalContent className="w-full bg-transparent p-0 border-0">
            <ModalBody className="w-full" style={{ padding: 0, margin: 0 }}>
              {options?.content}
            </ModalBody>
          </ModalContent>
        ) : (
          <ModalContent
            className="bg-background-500 border border-white/10 rounded-4xl w-5/6"
            style={styles.modalShadow}
          >
            <>
              <ModalHeader>
                <AppText
                  size={22}
                  lineHeight={26}
                  weight={700}
                  className="-tracking-2 text-modal-title text-center w-11/12 mx-auto"
                >
                  {options?.title}
                </AppText>
              </ModalHeader>

              <ModalBody>
                {options?.subtitle ? (
                  <AppText
                    size={14}
                    weight={400}
                    className="-tracking-2 text-modal-desc text-center w-11/12 mx-auto"
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
                          className={`w-full h-modal-button items-center justify-center border rounded-[18px] ${
                            isPrimary
                              ? 'bg-primary-500 border-transparent'
                              : 'bg-white/5 border-white/10'
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
