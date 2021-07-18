import * as React from 'react';

interface SelectorProps {
  data: string[];
  selectedValue: string;
  selectionTopic: string;
  label: string;
  onChangeEvent: React.ChangeEventHandler<HTMLSelectElement>;
}

export const Selector = (props: SelectorProps) => {
  const { data, selectedValue, selectionTopic, label, onChangeEvent } = props;
  return (
    <div>
      <label htmlFor={selectionTopic}>{label}</label>
      <select
        name={selectionTopic}
        // defaultValue={yearSelected}
        value={selectedValue}
        onChange={onChangeEvent}
      >
        {data.sort().map((item) => (
          <option key={`${selectionTopic}-${item}`} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
