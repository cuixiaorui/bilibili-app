const { getNewMessages } = require("../rootHistory.js");

describe("roomHistory", () => {
  it("getNewMessages", () => {
    //ts up
    const rooms = [
      {
        text: "1",
        check_info: {
          ts: 1627652861,
        },
      },
      {
        text: "2",
        check_info: {
          ts: 1627652878,
        },
      },
    ];

    const resultFirst = getNewMessages(rooms);
    expect(resultFirst).toEqual(rooms);

    const rooms2 = [
      {
        text: "2",
        check_info: {
          ts: 1627652878,
        },
      },
      {
        text: "3",
        check_info: {
          ts: 1627652920,
        },
      },
    ];

    const resultSecond = getNewMessages(rooms2);
    expect(resultSecond).toEqual([
      {
        text: "3",
        check_info: {
          ts: 1627652920,
        },
      },
    ]);
  });
});
