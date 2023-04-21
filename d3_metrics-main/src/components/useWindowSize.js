import React from 'react';

const useWindowSize = () => {
  const [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    //до отрисовки в уже созданном DOM дереве
    const updateSize = () => {
      const container = document.getElementById('chart-container');
      setSize([container.clientWidth, container.clientHeight]);
    };
    window.addEventListener('resize', updateSize); //запуститься, когда размер окна будет изменен
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};

export default useWindowSize;
