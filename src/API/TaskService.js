import axios from "axios";

export default class TasksService {
  // функция, которая запрашивает у апи гитхаба полученного пользователя
  static async byName(username) {
    const response = await axios.get("https://api.github.com/search/users", {
      params: {
        q: username,
      },
      headers: {
        Authorization: `Bearer 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`,
      },
      // токен авторизации истек
    });

    return response.data;
  }

  // функция, которая запрашивает у апи гитхаба полученного пользователя по айди
  static async byUserId(id) {
    const response = await axios.get(`https://api.github.com/user/${id}`, {
      headers: {
        Authorization: `Bearer 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`,
      },
    });

    return response;
  }
}
