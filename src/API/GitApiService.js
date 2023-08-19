import axios from "axios";

export default class GitApiService {
  // функция, которая запрашивает у апи гитхаба полученного пользователя
  static async byName(username) {
    try {
      const response = await axios.get("https://api.github.com/search/users", {
        params: {
          q: username,
        },
        headers: {
          Authorization: `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`,
        },
      });
      return response.data;
    } catch (error) {
      // if (error.message.includes("403")) {
      //   alert(
      //     "Слишком много запросов, попробуйте позже или перезагрузите страницу."
      //   );
      // }
      console.error(error);
    }
  }

  // функция, которая запрашивает у апи гитхаба полученного пользователя по айди
  static async byUserId(id) {
    try {
      const response = await axios.get(`https://api.github.com/user/${id}`, {
        headers: {
          Authorization:
            "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",
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
