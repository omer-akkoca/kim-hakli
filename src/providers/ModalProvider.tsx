import React, { useCallback, useState } from 'react';
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
import { Platform, StyleSheet } from 'react-native';

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
      if (!options?.noClosable) {
        hide();
      }
      btn.onPress?.();
    },
    [hide, options],
  );

  return (
    <ModalContext.Provider value={{ show, hide }}>
      {children}
      <Modal isOpen={visible} onClose={options?.noClosable ? null : hide}>
        <ModalBackdrop className="bg-modal-backdrop" />
        <ModalContent
          className="bg-background-500 border border-white/10 rounded-4xl w-5/6"
          style={styles.modalShadow}
        >
          <ModalHeader>
            {/* Title */}
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
          </ModalBody>

          <ModalFooter>
            {/* Buttons */}
            {options?.buttons && options.buttons.length > 0 ? (
              <VStack space="sm" className="w-full">
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
          </ModalFooter>
        </ModalContent>
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
