import fs from 'node:fs'
import path from 'node:path'
import sgf from 'staged-git-files'
import AdmZip from 'adm-zip'
import { minimatch } from 'minimatch'

async function gtex(options) {
  options.dest = options.dest || '.gtex'

  // 获取暂存的文件
  let files = await sgf()

  // 过滤文件(排除删除、匹配规则)
  files = files.filter(file => file.status !== 'Deleted')
  if (options.filter) {
    files = files.filter(file => minimatch(file.filename, options.filter))
  }

  // 复制文件到指定文件夹
  fs.existsSync(options.dest) && fs.rmSync(options.dest, { recursive: true })
  for (const file of files) {
    const filename = file.filename
    const destname = path.join(options.dest, filename)

    fs.mkdirSync(path.dirname(destname), { recursive: true })
    fs.copyFileSync(filename, destname)

    // eslint-disable-next-line no-console
    console.log(`gtex file | \x1B[4m\x1B[34m${destname}\x1B[0m`)
  }

  // 读取目录生成压缩包
  if (options.zip) {
    const zipFile = new AdmZip()
    zipFile.addLocalFolder(options.dest)
    zipFile.writeZip(path.join(options.dest, options.zip))

    // eslint-disable-next-line no-console
    console.log(`gtex zip | \x1B[4m\x1B[34m${path.join(options.dest, options.zip)}\x1B[0m`)
  }
}

export default gtex
