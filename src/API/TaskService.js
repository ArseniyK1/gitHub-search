import axios from "axios";

export default class TasksService {
  // функция, которая запрашивает у апи гитхаба полученного пользователя
  static async byName(username) {
    const response = await axios.get("https://api.github.com/search/users", {
      params: {
        q: username,
      },
      // headers: {
      //   Authorization: `Bearer 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`,
      // },
      // токен авторизации истек
    });

    return response.data;
  }

  // функция, которая запрашивает у апи гитхаба полученного пользователя по айди
  static async byUserId(id) {
    const response = await axios.get(
      `https://api.github.com/user/${id}`
      // headers: {
      //   Authorization: `Bearer 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`,
      // },
    );

    return response;
  }
}
