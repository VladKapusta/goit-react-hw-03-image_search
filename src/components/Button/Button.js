export const Button = ({ incr, loading }) => {
  return (
    <button className="Button" type="button" onClick={() => incr()}>
      {loading ? 'Loading...' : 'Load More'}
    </button>
  );
};
