import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Connection, Handle, Position, useReactFlow } from "reactflow";
import cx from "classnames";
import { colors, valueTypeColorMap } from "../util/colors";
import { InputSocketSpecJSON, NodeSpecJSON } from "@behave-graph/core";
import { isValidConnection } from "../util/isValidConnection";
import { AutoSizeInput } from "./AutoSizeInput";
import { useEffect } from "react";

export type InputSocketProps = {
  connected: boolean;
  value: any | undefined;
  onChange: (key: string, value: any) => void;
  specJSON: NodeSpecJSON[];
} & InputSocketSpecJSON;

const InputFieldForValue = ({ choices, value, defaultValue, onChange, name, valueType }: Pick<InputSocketProps, 'choices' | 'value' | 'defaultValue' | 'name' | 'onChange' | 'valueType' >) => {
  const showChoices = choices?.length;
  const inputVal = String(value) ?? defaultValue ?? "";

  if (showChoices)
    return <select className="bg-gray-600 disabled:bg-gray-700 py-1 px-2 nodrag" value={value ?? defaultValue ?? ""} onChange={(e) => onChange(name, e.currentTarget.value)}>
      <>
        {choices.map(choice => (
          <option key={choice.text} value={choice.value}>{choice.text}</option>
        ))}
      </>
    </select>

  return <>
    {valueType === "string" && (
      <AutoSizeInput
        type="text"
        className="bg-gray-600 disabled:bg-gray-700 py-1 px-2 nodrag"
        value={inputVal}
        onChange={(e) => onChange(name, e.currentTarget.value)}
      />
    )}
    {valueType === "number" && (
      <AutoSizeInput
        type="number"
        className=" bg-gray-600 disabled:bg-gray-700 py-1 px-2 nodrag"
        value={inputVal}
        onChange={(e) => onChange(name, e.currentTarget.value)}
      />
    )}
    {valueType === "float" && (
      <AutoSizeInput
        type="number"
        className=" bg-gray-600 disabled:bg-gray-700 py-1 px-2 nodrag"
        value={inputVal}
        onChange={(e) => onChange(name, e.currentTarget.value)}
      />
    )}
    {valueType === "integer" && (
      <AutoSizeInput
        type="number"
        className=" bg-gray-600 disabled:bg-gray-700 py-1 px-2 nodrag"
        value={inputVal}
        onChange={(e) => onChange(name, e.currentTarget.value)}
      />
    )}
    {valueType === "boolean" && (
      <input
        type="checkbox"
        className=" bg-gray-600 disabled:bg-gray-700 py-1 px-2 nodrag"
        value={inputVal}
        onChange={(e) => onChange(name, e.currentTarget.checked)}
      />
    )}
  </>;
}

export default function InputSocket({
  connected,

  specJSON,
  ...rest
}: InputSocketProps) {
  const { value,
    name,
    valueType,
    defaultValue,
    choices, } = rest;
  const instance = useReactFlow();
  
  const isFlowSocket = valueType === "flow";

  let colorName = valueTypeColorMap[valueType];
  if (colorName === undefined) {
    colorName = "red";
  }

  const inputVal = String(value) ?? defaultValue ?? "";
  useEffect(() => {
    console.log({ value, name, valueType , inputVal, choices});
  }, [value, name, valueType, inputVal, choices])

  const [backgroundColor, borderColor] = colors[colorName];
  const showName = isFlowSocket === false || name !== "flow";

  return (
    <div className="flex grow items-center justify-start h-7">
      {isFlowSocket && (
        <FontAwesomeIcon icon={faCaretRight} color="#ffffff" size="lg" />
      )}
      {showName && <div className="capitalize mr-2">{name}</div>}
      {!isFlowSocket && (
        !connected && <InputFieldForValue {...rest} />
      )}
      <Handle
        id={name}
        type="target"
        position={Position.Left}
        className={cx(borderColor, connected ? backgroundColor : "bg-gray-800")}
        isValidConnection={(connection: Connection) =>
          isValidConnection(connection, instance, specJSON)
        }
      />
    </div>
  );
}
