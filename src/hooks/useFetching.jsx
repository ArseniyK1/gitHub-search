export const useFetching = (callback) => {
  // хук, который запускает полученную асинхронную функцию и в случае ошибки выбрасывает ошибку
  const fetching = async () => {
    try {
      await callback();
    } catch (error) {
      console.error(error.message);
    }
  };

  return [fetching];
};
