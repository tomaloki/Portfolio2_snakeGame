interface Point {
    x: number;
    y: number;
}

function pointEq(pointA: Point, pointB: Point): boolean {
    return pointA.x === pointB.x && pointA.y === pointB.y;
}

function moveInDirection(point: Point, vector: Point): Point {
    return { x: point.x + vector.x, y: point.y + vector.y };
}

function reverseVector(vector: Point): Point {
    return { x: vector.x * -1, y: vector.y * -1 };
}

const STILL: Point = { x: 0, y: 0 };
const UP: Point = { x: 0, y: -1 };
const RIGHT: Point = { x: 1, y: 0 };
const DOWN: Point = { x: 0, y: 1 };
const LEFT: Point = { x: -1, y: 0 };

export { Point, pointEq, moveInDirection, reverseVector, STILL, UP, RIGHT, DOWN, LEFT };
