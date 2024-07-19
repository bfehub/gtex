import fs from 'node:fs'
import path from 'node:path'
import sgf from 'staged-git-files'
import { minimatch } from 'minimatch'

async function gtex(options) {
  const { filter, dest = '.gtex' } = options

  // 获取暂存的文件
  let files = await sgf()

  // 过滤文件(排除删除、匹配规则)
  files = files.filter(file => file.status !== 'Deleted')
  if (filter) {
    files = files.filter(file => minimatch(file.filename, filter))
  }

  // 复制文件到指定文件夹
  fs.existsSync(dest) && fs.rmSync(dest, { recursive: true })
  for (const file of files) {
    const filename = file.filename
    const destname = path.join(dest, filename)

    fs.mkdirSync(path.dirname(destname), { recursive: true })
    fs.copyFileSync(filename, destname)

    // eslint-disable-next-line no-console
    console.log(`gtex file | \x1B[4m\x1B[34m${destname}\x1B[0m`)
  }
}

export default gtex
