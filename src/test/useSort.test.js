import GitApiService from "../API/GitApiService";
import { useSort } from "../hooks/useSort"; // Укажите путь к вашему файлу

describe("useSort", () => {
  const mockUsers = [
    { login: "ar", id: 100354, public_repos: 1 },
    { login: "harlanhaskins", id: 853032, public_repos: 172 },
    { login: "augmentedstartups", id: 4731260, public_repos: 59 },
  ];

  const mockRepos = [
    { public_repos: 1 }, // Репозитории для первого пользователя
    { public_repos: 172 }, // Репозитории для второго пользователя
    { public_repos: 59 }, // Репозитории для третьего пользователя
  ];

  it("should sort users by ascending public repos count", async () => {
    GitApiService.byUserId = jest.fn((userId) => {
      const userIndex = mockUsers.findIndex((user) => user.id === userId);
      return { data: mockRepos[userIndex] };
    });

    const sortedUsers = await useSort(mockUsers, "По возрастанию");

    const expectedSortedUsers = [
      // Ожидаемый порядок пользователей после сортировки
      { login: "ar", id: 100354, public_repos: 1 },
      { login: "augmentedstartups", id: 4731260, public_repos: 59 },
      { login: "harlanhaskins", id: 853032, public_repos: 172 },
    ];

    expect(sortedUsers).toEqual(expectedSortedUsers);
  });

  it("should sort users by descending public repos count", async () => {
    GitApiService.byUserId = jest.fn((userId) => {
      const userIndex = mockUsers.findIndex((user) => user.id === userId);
      return { data: mockRepos[userIndex] };
    });

    const sortedUsers = await useSort(mockUsers, "По убыванию");

    const expectedSortedUsers = [
      // Ожидаемый порядок пользователей после сортировки
      { login: "harlanhaskins", id: 853032, public_repos: 172 },
      { login: "augmentedstartups", id: 4731260, public_repos: 59 },
      { login: "ar", id: 100354, public_repos: 1 },
    ];

    expect(sortedUsers).toEqual(expectedSortedUsers);
  });
});
