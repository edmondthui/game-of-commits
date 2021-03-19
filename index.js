(function startGame() {
  let weeks = document
    .querySelector(".js-calendar-graph-svg")
    .querySelectorAll("g g");
  let title = document.querySelector(".js-yearly-contributions div h2");
  let rows = 7;
  let columns = 52;

  function getDays(week) {
    let days = week.querySelectorAll(".ContributionCalendar-day");
    return [...days].map((day) => dayInfo(day));
  }

  function dayInfo(day) {
    let commits = parseInt(day.getAttribute("data-count"));
    let dayObj = {
      day: day,
      commits: commits,
      alive: commits > 0 ? 1 : 0,
      next: 0,
    };
    console.log(dayObj);
    return dayObj;
  }

  let board = [...weeks].map((week) => getDays(week));
})();
