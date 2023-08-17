import axios from "axios";

export default class TasksService {
  static async byName(username) {
    const response = await axios.get("https://api.github.com/search/users", {
      params: {
        q: username,
      },
      headers: {
        Authorization: `Bearer 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`,
      },
    });

    return response.data;
  }

  static async byUserId(id) {
    const response = await axios.get(`https://api.github.com/user/${id}`, {
      headers: {
        Authorization: `Bearer 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`,
      },
    });

    return response;
  }
}
