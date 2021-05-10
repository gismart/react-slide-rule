import React, { useState } from 'react';
import SlideRule from 'react-slide-rule';

export default React.memo(function () {
  const [value, setValue] = useState(150);
  const [ref, setRef] = useState(null);
  const width = ref?.offsetWidth;

  return (
    <div ref={(node) => setRef(node)}>
      <SlideRule value={value} onChange={setValue} width={width} />
    </div>
  );
});
