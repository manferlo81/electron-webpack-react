import { readFile } from 'fs';
import { join } from 'path';
import React, { FC, useEffect, useState } from 'react';
import { promisify } from 'util';

const read = promisify(readFile);

const App: FC = () => {

  const [data, setData] = useState({ name: '', description: '', text: '' });

  useEffect(() => {
    const p = async () => {
      const { name, description } = await import('../../package.json');
      const buffer = await read(join(__static, 'text.txt'));
      setData({ name, description, text: buffer.toString() });
    };
    void p();
  }, []);

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <p>{data.text}</p>
    </div>
  );

};

export default App;
