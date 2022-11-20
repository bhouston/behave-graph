import { FC, PropsWithChildren } from 'react';
import { useOnPressKey } from '../hooks/useOnPressKey';
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

export type ModalAction = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export type ModalProps = {
  open?: boolean;
  onClose: () => void;
  title: string | JSX.Element;
  subtitle?: string;
  actions: ModalAction[];
  width?: string;
};

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  open = false,
  onClose,
  title,
  subtitle,
  children,
  actions,
  width = '96',
}) => {
  useOnPressKey('Escape', onClose);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg lg:max-w-lg sm:p-6">
                <div>
                  {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div> */}
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {title}
                    </Dialog.Title>

                    {subtitle && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{subtitle}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm mt-2">{children}</div>
                <div className={`mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-${actions.length} sm:gap-3`}>
                  {actions.map((action, ix) => (
                    <button
                      key={ix}
                      className={clsx('disabled:opacity-50', {
                        [`sm:col-start-${ix + 1}`]: actions.length > 1,
                        'inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm':
                          ix === actions.length - 1,
                        'mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:text-sm':
                          ix !== actions.length - 1,
                      })}
                      onClick={action.onClick}
                      disabled={action.disabled}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
