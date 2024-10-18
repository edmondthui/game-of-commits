(function startGame() {
  let weeks = [
    ...document
      .querySelector(".js-calendar-graph-table")
      .querySelectorAll("tbody tr"),
  ];
  let title = document.querySelector(".js-yearly-contributions div h2");
  let rows = 6;
  let columns = 53;
  let generation = 0;

  function getDays(week) {
    let days = week.querySelectorAll(".ContributionCalendar-day");
    return [...days].map((day) => dayInfo(day));
  }

  function dayInfo(day) {
    let commits = parseInt(day.getAttribute("data-level"));
    let dayObj = {
      day: day,
      commits: commits,
      alive: commits > 0 ? 1 : 0,
      next: 0,
    };
    return dayObj;
  }

  let board = weeks.slice(0, weeks.length - 1).map((week) => getDays(week));

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
    for (let i = 0; i < rows; i++) {
      const prevRow = i === 0 ? rows - 1 : i - 1;
      const nextRow = i === rows - 1 ? 0 : i + 1;
      for (let j = 0; j < columns; j++) {
        const prevColumn = j === 0 ? columns - 1 : j - 1;
        const nextColumn = j === columns - 1 ? 0 : j + 1;
        let neighbors = 0;
        neighbors += board[prevRow][prevColumn].alive;
        neighbors += board[i][prevColumn].alive;
        neighbors += board[nextRow][prevColumn].alive;

        neighbors += board[prevRow][j].alive;
        neighbors += board[nextRow][j].alive;

        neighbors += board[prevRow][nextColumn].alive;
        neighbors += board[i][nextColumn].alive;
        neighbors += board[nextRow][nextColumn].alive;

        board[i][j].neighbors = neighbors;
        board[i][j].next = logic(board[i][j].alive, neighbors);
      }
    }
  }

  function displayBoard(board) {
    let greens = ["#9BE9A8", "#40C463", "#30A14E", "#216E39"];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let randomGreen = greens[Math.floor(Math.random() * greens.length)];
        if (board[i][j].alive) {
          board[i][j].day.style.backgroundColor = randomGreen;
        } else {
          board[i][j].day.style.backgroundColor = "#161B22";
        }
      }
    }
  }

  function iterateBoard(board) {
    let changed = false;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const day = board[i][j];
        if (day.alive !== day.next) {
          changed = true;
        }
        day.alive = day.next;
      }
    }
    return changed;
  }

  function engine() {
    setNext(board);
    displayBoard(board);
    generation++;
    let changed = iterateBoard(board);
    if (!changed) {
      let titleText = `Game of commits finished after ${generation} generations`;
      title.innerText = titleText;
    } else {
      let titleText = `${generation} generations`;
      title.innerText = titleText;
      setTimeout(engine, 300);
    }
  }

  engine();
})();
