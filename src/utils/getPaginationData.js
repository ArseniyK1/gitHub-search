export const getPage = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
}; // эта функция считает сколько страниц нужно для пагинации, totalCount - всего карточек

export const getPagesArr = (totalPages) => {
  let result = [];
  for (let i = 0; i < totalPages; i++) {
    result.push(i + 1);
  }
  return result;
}; // эта функция возвращает массив. Например, если нам нужно отобразить 100 элементов,
//  то нам нужен массив состоящий из [1,2,3,...,100] - этот массив эта функция и возвращает
