import { Audio } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Audio
  height="100"
  width="100"
  color="#3f51b5"
  ariaLabel="audio-loading"
  wrapperStyle={{margin: 'auto'}}
  wrapperClass="wrapper-class"
  visible={true}
/>
  );
};
