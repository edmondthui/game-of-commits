(function startGame() {
  let weeks = [
    ...document.querySelector(".js-calendar-graph-svg").querySelectorAll("g g"),
  ];
  let lastWeek = weeks.pop();
  let title = document.querySelector(".js-yearly-contributions div h2");
  let rows = 7;
  let columns = 52;
  let generation = 0;

  function clearWeek(week) {
    [...week.children].forEach((day) => {
      day.style = "display: none";
    });
  }

  clearWeek(lastWeek);

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
    return dayObj;
  }

  let board = weeks.map((week) => getDays(week));

  function logic(alive, neighbors) {
    if (alive) {
      if (neighbors > 3 || neighbors < 2) {
        return 0;
      }
      return 1;
    } else {
      if (neighbors === 3) {
        return 1;
      }
    }
    return 0;
  }

  function setNext(board) {
    for (let i = 0; i < columns; i++) {
      const prevColumn = i === 0 ? columns - 1 : i - 1;
      const nextColumn = i === columns - 1 ? 0 : i + 1;
      for (let j = 0; j < rows; j++) {
        const prevRow = j === 0 ? rows - 1 : j - 1;
        const nextRow = j === rows - 1 ? 0 : j + 1;
        let neighbors = 0;
        neighbors += board[prevColumn][prevRow].alive;
        neighbors += board[prevColumn][j].alive;
        neighbors += board[prevColumn][nextRow].alive;

        neighbors += board[i][prevRow].alive;
        neighbors += board[i][nextRow].alive;

        neighbors += board[nextColumn][prevRow].alive;
        neighbors += board[nextColumn][j].alive;
        neighbors += board[nextColumn][nextRow].alive;

        board[i][j].neighbors = neighbors;
        board[i][j].next = logic(board[i][j].alive, neighbors);
      }
    }
  }

  function displayBoard(board) {
    let greens = ["#9BE9A8", "#40C463", "#30A14E", "#216E39"];
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        let randomGreen = greens[Math.floor(Math.random() * greens.length)];
        if (board[i][j].alive) {
          board[i][j].day.setAttribute("style", "fill:" + randomGreen);
        } else {
          board[i][j].day.setAttribute("style", "fill: #eeeeee");
        }
      }
    }
  }

  function iterateBoard(board) {
    let changed = false;
    for (let i = 0; i < columns; i ++) {
      for (let j = 0; j < rows; j ++) {
        const day = board[i][j]
        if (day.alive !== day.next) {
          changed = true
        }
        day.alive = day.next
      }
    }
    return changed
  }

  function engine() {
    setNext(board);
    displayBoard(board);
    generation++;
    let changed = iterateBoard(board);
    if (!changed) {
      let titleText = `Game of commits finished after ${generation} generations`
      title.innerText = titleText;
    } else {
      let titleText = `${generation} generations`
      title.innerText = titleText;
      setTimeout(engine, 300);
    }
  }

  engine();
})();
