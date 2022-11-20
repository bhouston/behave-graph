import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { VscSplitHorizontal, VscSplitVertical } from "react-icons/vsc";
import SplitPane from "react-split-pane";

type splitDirection = 'vertical' | 'horizontal';

const TogglePaneButton = ({
  splitDirection,
  buttonSplitDirection,
  setSplitDirection,
  children,
}: TogglePangeButtonProps & {
  buttonSplitDirection: splitDirection;
  children: JSX.Element[];
}) => {
  const active = buttonSplitDirection === splitDirection;
  return (
    <button
      type="button"
      className={clsx('font-medium text-sm p-2 text-center inline-flex items-center mr-2', {
        'text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800':
          active,
        'text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800':
          !active,
      })}
      onClick={() => setSplitDirection(buttonSplitDirection)}
    >
      {children}
    </button>
  );
};

type TogglePangeButtonProps = {
  splitDirection: 'vertical' | 'horizontal';
  setSplitDirection: (dir: splitDirection) => void;
};

const TogglePaneButtons = (props: TogglePangeButtonProps) => (
  <>
    <TogglePaneButton {...props} buttonSplitDirection="vertical">
      <VscSplitHorizontal />
      <span className="sr-only">Split Vertical</span>
    </TogglePaneButton>

    <TogglePaneButton {...props} buttonSplitDirection="horizontal">
      <VscSplitVertical />
      <span className="sr-only">Split Horizontal</span>
    </TogglePaneButton>
  </>
);

const SplitEditor = ({
  left,
  right
}: {
  left: JSX.Element | JSX.Element[] | undefined,
  right: JSX.Element | JSX.Element[] | undefined
}) => {
  const rightRef = useRef<HTMLDivElement | null>(null);

  const [dimensions, setDimensions] = useState<{ width: number; height: number }>();

  const handleSplitResized = useCallback(() => {
    if (rightRef.current) {
      const boundingRect = rightRef.current.getBoundingClientRect();
      setDimensions({
        height: boundingRect.height,
        width: boundingRect.width,
      });
    }
  }, []);

  const [splitDirection, setSplitDirection] = useState<splitDirection>('vertical');

  useEffect(() => {
    handleSplitResized();
  }, [handleSplitResized, splitDirection]);

  return (
  <>
      <div
          className={clsx('absolute right-2 z-50', {
            'top-14': splitDirection === 'horizontal',
            'top-2': splitDirection === 'vertical',
          })}
        >
          <TogglePaneButtons setSplitDirection={setSplitDirection} splitDirection={splitDirection} />
        </div>
        {/* @ts-ignore */}
        <SplitPane split={splitDirection} defaultSize={800} onChange={handleSplitResized}>
          <div className="w-full h-full">
            {left}
          </div>
          <div className="w-full h-full overflow-hidden" ref={rightRef}>
            {dimensions && (
              <div style={{ ...dimensions }} className="absolute z-40">
                {right}
              </div>
            )}
          </div>
        </SplitPane>
  
  </>
  )
}

export default SplitEditor;