import fs from 'fs'

export const getFilenames = async (path: string): Promise<string[]> => {
  return fs.promises.readdir(path)
}

export const readFile = async (path: string): Promise<string> => {
  return fs.promises.readFile(path, { encoding: 'utf8' })
}
