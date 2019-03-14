class Entity {
  constructor(iterations) {
    this.points = [];
    this.sticks = [];
    this.iterations = iterations || 16;
  }

  pin(index) {
    this.points[index].pin();
  }

  // joinEntities(...args) {
  //   let points = [];
  //   let sticks = [];
  //   for (let i = 0; i < args.length; i++) {
  //     points.push(args[i].points);
  //     sticks.push(args[i].sticks);
  //   }

  //   points = [].concat.apply([], points);
  //   sticks = [].concat.apply([], sticks);
  //   this.points = points;
  //   this.sticks = sticks;
  // }
  removeSticks(p) {
    this.sticks.splice(this.sticks.indexOf(p.sticks[0]), 1);
    p.sticks.splice(0, 1);
  }

  setVelocity(x, y) {
    // this.points[Math.floor(Math.random() * (this.points.length - 1))].oldpos.rotate(Math.random() / 10);
    this.points.map(e => {
      e.oldpos.x += x;
      e.oldpos.y += y;
    })
  }

  addPoint(x, y, vx, vy, radius) {
    let p
    if (x instanceof Point) {
      p = x;
    } else {
      p = new Point(x, y, vx, vy, radius);
    }
    this.points.push(p);
    return p;
  }

  addStick(p1, p2, length) {
    let s;
    if (p1 instanceof Stick) {
      this.sticks.push(p1);
    } else {
      this.sticks.push(new Stick(this.points[p1], this.points[p2], length));
    }
    return s;
  }

  updatePoints() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].update();
    }
  }

  renderPoints() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].render();
    }
  }

  updateSticks(stepCoef) {
    for (let i = 0; i < this.sticks.length; i++) {
      this.sticks[i].update(stepCoef);
    }
  }

  renderSticks() {
    for (let i = 0; i < this.sticks.length; i++) {
      this.sticks[i].render();
    }
  }

  updateContrains() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].constrain();
    }
  }

  renderPointsIndex() {
    for (let i = 0; i < this.points.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = 'black';
      ctx.fillText(i, this.points[i].pos.x + 5, this.points[i].pos.y - 6);
      ctx.closePath();
    }
  }

  update() {
    var stepCoef = 1 / this.iterations;
    this.updatePoints();
    for (let j = 0; j < this.iterations; ++j) {
      this.updateSticks(stepCoef);
    }
    this.updateContrains();
    this.renderPoints();
    this.renderSticks();
  }
}