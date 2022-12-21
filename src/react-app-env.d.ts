/// <reference types="react-scripts" />

interface Ant {
    id: number
    name: string,
    color: string,
    length: number,
    weight: number,
    status?: string,
    result?: number
}

interface AntArray extends Array<Ant> { }