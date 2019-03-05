'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

const { fixDotfiles } = require('./fix-dotfiles')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    // This makes `projectName` a possible argument
    this.argument('projectName', { type: String, required: false })
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to our ${chalk.green('gatsby')} generator!
      
      Let's create your new ${
        this.options.projectName
          ? chalk.green(
              this.options.projectName.replace(/\b\w/g, l => l.toUpperCase())
            )
          : ''
      } project`)
    )

    let prompts = []

    // If not projectName declared then ask for it
    if (!this.options.projectName || this.options.projectName.length < 1) {
      prompts = [
        {
          type: 'input',
          name: 'projectName',
          message: `What is the name of your project? ${chalk.gray(
            "will be the folder's name"
          )}`,
          filter: projectName => {
            return projectName
              .toLowerCase()
              .trim()
              .split(' ')
              .join('-')
          }
        }
      ]
    }

    prompts = [
      ...prompts,
      {
        type: 'input',
        name: 'websiteFullName',
        message: `Enter full name of the site`,
        validate: input => {
          if (input && input.length >= 1) {
            return true
          }
          return "Site's name is required"
        }
      },
      {
        type: 'input',
        name: 'websiteDescription',
        message: `Enter default description ${chalk.gray(chalk.italic('(SEO friendly feature)'))}`
      },
      {
        type: 'input',
        name: 'websiteKeywords',
        message: `Enter default keywords ${chalk.gray(chalk.italic('(SEO friendly feature)'))}`
      },
      {
        type: 'input',
        name: 'language',
        message: `Enter site language code? ${chalk.gray(chalk.italic('(for example en, de, etc.)'))}`,
        default: 'en'
      },
      {
        type: 'input',
        name: 'primaryTextColor',
        message: `Enter color for texts ${chalk.gray(chalk.italic('(use hex value eg. #000000 for black)'))}`,
        default: '#000000',
        validate: input => {
          return validateHex(input)
        }
      },
      {
        type: 'input',
        name: 'primaryLinkColor',
        message: `Enter color for links ${chalk.gray(chalk.italic('(use hex value eg. #000000 for black)'))}`,
        default: '#2297bd',
        validate: input => {
          return validateHex(input)
        }
      },
      {
        type: 'input',
        name: 'alternateTextColor',
        message: `Enter alternate (hover) color ${chalk.gray(chalk.italic('(use hex value eg. #000000 for black)'))}`,
        default: '#0a348a',
        validate: input => {
          return validateHex(input)
        }
      },
      {
        type: 'input',
        name: 'manifestColor',
        message: `Enter manifest color for the site ${chalk.gray(chalk.italic('(use hex value eg. #ffffff for white)'))}`,
        default: '#ffffff',
        validate: input => {
          return validateHex(input)
        }
      },
      {
        type: 'input',
        name: 'websiteURL',
        message: `Enter site's root URL ${chalk.gray(chalk.italic('(place where site will be deplyed to)'))}`,
        validate: input => {
          if (
            input &&
            input.length >= 1 &&
            input.indexOf('http') >= 0
          ) {
            return true
          }
          return 'Add a proper URL. It should start with http'
        }
      }
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
  }

  writing() {
    let projectName =
      !this.options.projectName || this.options.projectName.length < 1
        ? this.props.projectName
        : this.options.projectName
    projectName = projectName
      .toLowerCase()
      .trim()
      .split(' ')
      .join('-')
    this.destinationRoot(projectName)

    const props = { ...this.props, projectName }

    // Components
    this.fs.copyTpl(
      `${this.templatePath()}/components/**/*`,
      `${this.destinationPath()}/src/components/`,
      props
    )

    // Pages
    this.fs.copyTpl(
      `${this.templatePath()}/pages/**/*`,
      `${this.destinationPath()}/src/pages/`,
      props
    )

    // Static - default favicon, robots.txt
    this.fs.copyTpl(
      `${this.templatePath()}/static/**/*`,
      `${this.destinationPath()}/static/`,
      props
    )

    // Utils, assets, content
    this.fs.copyTpl(
      `${this.templatePath()}/utils/**/*`,
      `${this.destinationPath()}/src/utils/`,
      props
    )
    this.fs.copyTpl(
      `${this.templatePath()}/assets/**/*`,
      `${this.destinationPath()}/src/assets/`,
      props
    )
    this.fs.copyTpl(
      `${this.templatePath()}/content/index.js`,
      `${this.destinationPath()}/src/content/index.js`,
      props
    )

    // Files on root. Mainly config files
    this.fs.copyTpl(
      `${this.templatePath()}/config-files/*`,
      this.destinationPath(),
      props
    )

    fixDotfiles(this)
  }

  install() {
    this.yarnInstall()
  }
}

function validateHex(input) {
  const isValidColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(input)
  if (isValidColor) {
    return true
  }
  return "That's not a valid hexadecimal color"
}
