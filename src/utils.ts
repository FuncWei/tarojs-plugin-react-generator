import * as fs from 'fs'
import * as ejs from 'ejs'
import * as prettier from 'prettier'

// 获取用户项目中的Prettier配置
const _prettierConfig = prettier.resolveConfig.sync(process.cwd())

// 使用用户项目中的Prettier配置格式化代码
export function prettierFormat(code: string) {
  return prettier.format(code, { parser: 'babel', ..._prettierConfig })
}
export function upperFirst(str: string) {
  return str.replace(/\b(\w)(\w*)/g, (_$0, $1, $2) => {
    return $1.toUpperCase() + $2
  })
}
export function lowerFirst(str: string) {
  return str.replace(/\b(\w)(\w*)/g, (_$0, $1, $2) => {
    return $1.toLowerCase() + $2
  })
}
const cssExts = {
  none: 'css',
  sass: 'scss',
  less: 'less',
  stylus: 'styl',
}
export function getCssExt(css: string) {
  // @ts-ignore
  return cssExts[css]
}

export function getCssModuleExt(cssModules: boolean) {
  return cssModules ? '.module' : ''
}

export function getCssModuleClassName(className: string, cssModules: boolean) {
  return cssModules ? `{styles.${className}}` : `'${className}'`
}

export function getCssImport(cssModules: boolean, cssExt: string) {
  return `import${cssModules ? ' styles from' : ''} './index${getCssModuleExt(cssModules)}.${cssExt}';`
}

export function createByEjs(path: string, params: object = {}, errMsg: string = '') {
  try {
    const str = fs.readFileSync(path, 'utf8')
    return ejs.render(str, {
      upperFirst,
      lowerFirst,
      ...params,
    })
  } catch (err) {
    console.log(err)
    console.log(errMsg)
    return ''
  }
}
