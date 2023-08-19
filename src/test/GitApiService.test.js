import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import GitApiService from "../API/GitApiService";

describe("GitApiService", () => {
  let mockAxios;

  beforeAll(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("should fetch user by name", async () => {
    const mockUserData = {
      total_count: 5,
      incomplete_results: false,
      items: [
        {
          login: "ars",
          id: 33244,
          node_id: "MDQ6VXNlcjMzMjQ0",
          avatar_url: "https://avatars.githubusercontent.com/u/33244?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/ars",
          html_url: "https://github.com/ars",
          followers_url: "https://api.github.com/users/ars/followers",
          following_url:
            "https://api.github.com/users/ars/following{/other_user}",
          gists_url: "https://api.github.com/users/ars/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/ars/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/ars/subscriptions",
          organizations_url: "https://api.github.com/users/ars/orgs",
          repos_url: "https://api.github.com/users/ars/repos",
          events_url: "https://api.github.com/users/ars/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/ars/received_events",
          type: "User",
          site_admin: false,
          score: 1.0,
        },
        {
          login: "NoXXXwill",
          id: 118853933,
          node_id: "U_kgDOBxWRLQ",
          avatar_url: "https://avatars.githubusercontent.com/u/118853933?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/NoXXXwill",
          html_url: "https://github.com/NoXXXwill",
          followers_url: "https://api.github.com/users/NoXXXwill/followers",
          following_url:
            "https://api.github.com/users/NoXXXwill/following{/other_user}",
          gists_url: "https://api.github.com/users/NoXXXwill/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/NoXXXwill/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/NoXXXwill/subscriptions",
          organizations_url: "https://api.github.com/users/NoXXXwill/orgs",
          repos_url: "https://api.github.com/users/NoXXXwill/repos",
          events_url: "https://api.github.com/users/NoXXXwill/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/NoXXXwill/received_events",
          type: "User",
          site_admin: false,
          score: 1.0,
        },
        {
          login: "bramses",
          id: 3282661,
          node_id: "MDQ6VXNlcjMyODI2NjE=",
          avatar_url: "https://avatars.githubusercontent.com/u/3282661?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/bramses",
          html_url: "https://github.com/bramses",
          followers_url: "https://api.github.com/users/bramses/followers",
          following_url:
            "https://api.github.com/users/bramses/following{/other_user}",
          gists_url: "https://api.github.com/users/bramses/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/bramses/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/bramses/subscriptions",
          organizations_url: "https://api.github.com/users/bramses/orgs",
          repos_url: "https://api.github.com/users/bramses/repos",
          events_url: "https://api.github.com/users/bramses/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/bramses/received_events",
          type: "User",
          site_admin: false,
          score: 1.0,
        },
        {
          login: "TheoryOfNekomata",
          id: 2346301,
          node_id: "MDQ6VXNlcjIzNDYzMDE=",
          avatar_url: "https://avatars.githubusercontent.com/u/2346301?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/TheoryOfNekomata",
          html_url: "https://github.com/TheoryOfNekomata",
          followers_url:
            "https://api.github.com/users/TheoryOfNekomata/followers",
          following_url:
            "https://api.github.com/users/TheoryOfNekomata/following{/other_user}",
          gists_url:
            "https://api.github.com/users/TheoryOfNekomata/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/TheoryOfNekomata/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/TheoryOfNekomata/subscriptions",
          organizations_url:
            "https://api.github.com/users/TheoryOfNekomata/orgs",
          repos_url: "https://api.github.com/users/TheoryOfNekomata/repos",
          events_url:
            "https://api.github.com/users/TheoryOfNekomata/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/TheoryOfNekomata/received_events",
          type: "User",
          site_admin: false,
          score: 1.0,
        },
        {
          login: "coalars",
          id: 127774050,
          node_id: "U_kgDOB52tYg",
          avatar_url: "https://avatars.githubusercontent.com/u/127774050?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/coalars",
          html_url: "https://github.com/coalars",
          followers_url: "https://api.github.com/users/coalars/followers",
          following_url:
            "https://api.github.com/users/coalars/following{/other_user}",
          gists_url: "https://api.github.com/users/coalars/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/coalars/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/coalars/subscriptions",
          organizations_url: "https://api.github.com/users/coalars/orgs",
          repos_url: "https://api.github.com/users/coalars/repos",
          events_url: "https://api.github.com/users/coalars/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/coalars/received_events",
          type: "User",
          site_admin: false,
          score: 1.0,
        },
      ],
    };

    const username = "ars";

    mockAxios
      .onGet("https://api.github.com/search/users")
      .reply(200, { items: [mockUserData] });

    const response = await GitApiService.byName(username);

    expect(response).toEqual({ items: [mockUserData] });
  });

  it("should fetch user by ID", async () => {
    const mockUserDataById = {
      login: "heavysixer",
      id: 123,
      node_id: "MDQ6VXNlcjEyMw==",
      avatar_url: "https://avatars.githubusercontent.com/u/123?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/heavysixer",
      html_url: "https://github.com/heavysixer",
      followers_url: "https://api.github.com/users/heavysixer/followers",
      following_url:
        "https://api.github.com/users/heavysixer/following{/other_user}",
      gists_url: "https://api.github.com/users/heavysixer/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/heavysixer/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/heavysixer/subscriptions",
      organizations_url: "https://api.github.com/users/heavysixer/orgs",
      repos_url: "https://api.github.com/users/heavysixer/repos",
      events_url: "https://api.github.com/users/heavysixer/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/heavysixer/received_events",
      type: "User",
      site_admin: false,
      name: "Mark Daggett",
      company: "Humansized Inc.",
      blog: "http://www.humansized.com",
      location: "Kansas City",
      email: null,
      hireable: true,
      bio: null,
      twitter_username: null,
      public_repos: 38,
      public_gists: 28,
      followers: 101,
      following: 38,
      created_at: "2008-02-02T15:06:53Z",
      updated_at: "2023-07-20T20:06:28Z",
    };
    const userId = 123;

    mockAxios
      .onGet(`https://api.github.com/user/${userId}`)
      .reply(200, mockUserDataById);

    const response = await GitApiService.byUserId(userId);

    expect(response.data).toEqual(mockUserDataById);
  });
});
