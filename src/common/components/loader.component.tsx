import * as React from 'react';

interface LoaderProps {
  text: string;
}

export const Loader = (props: LoaderProps) => <span>{props.text}</span>;
