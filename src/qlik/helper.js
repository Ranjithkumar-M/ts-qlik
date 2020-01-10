const evaluateExpression = (app, title) => {
  return new Promise((resolve, reject) => {
    if (title && title !== ' ' && typeof title === 'object') {
      app.createGenericObject({
        value: {
          qStringExpression: title.qStringExpression.qExpr
        }
      }, function (reply) {
        resolve(reply.value)
      });
    } else resolve(title)
  })
}
const objectProper = (app, model) => {
  return new Promise((resolve, reject) => {
    var proper = model.properties,
      title = proper.title,
      subtitle = proper.subtitle,
      footnote = proper.footnote,
      options = {};
    evaluateExpression(app, title).then((val) => {
      options['title'] = val;
      return evaluateExpression(app, subtitle)
    }).then((val) => {
      options['subtitle'] = val;
      return evaluateExpression(app, footnote)
    }).then((val) => {
      options['footnote'] = val;
      resolve(options)
    })
  })
}
const getQlikObjectTitles = (app, id) => {
  return new Promise((resolve, reject) => {
    app.getObjectProperties(id).then(function (model) {
      var proper = model.properties;
      if (proper.qExtendsId) {
        app.getObjectProperties(proper.qExtendsId).then(function (model) {
          objectProper(app, model).then((val) => {
            resolve(val);
          })
        })
      } else {
        objectProper(app, model).then((val) => {
          resolve(val);
        })
      }
    })
  })
}
const getlist = (app, type) => {
  return new Promise((resolve, reject) => {
    app.getList(type, function (reply) {
      resolve(reply);
    });
  })
}
const getSheetProps = (app, cb) => {
  getlist(app, 'sheet').then((props) => {
    let sheets = [];
    for (const sheet of props.qAppObjectList.qItems) {
      let cells = [];
      for (const cell of sheet.qData.cells) {
        getQlikObjectTitles(app, cell.name).then((titles) => {
          let title = titles['title'] ? titles['title'] : titles['subtitle'] ? titles['subtitle'] : titles['footnote'] ? titles['footnote'] : cell['name']
          cells.push({
            ...cell,
            ...{
              title: title
            }
          });
        })
        sheet['obj'] = cells;
      }
      sheets.push(sheet)
    }
    cb(sheets);
  })
}
const getMeasure = (app, cb) => {
  getlist(app, 'MeasureList').then((props) => {
    cb(props.qMeasureList.qItems);
  })
}
const getDimension = (app, cb) => {
  getlist(app, 'DimensionList').then((props) => {
    cb(props.qDimensionList.qItems);
  })
}
const getBookmark = (app, cb) => {
  getlist(app, 'BookmarkList').then((props) => {
    cb(props.qBookmarkList.qItems);
  })
}
const getField = (app, cb) => {
  getlist(app, 'FieldList').then((props) => {
    cb(props.qFieldList.qItems);
  })
}
const getMasterObj = (app, cb) => {
  getlist(app, 'MasterObject').then((props) => {
    cb(props.qMasterObject.qItems);
  })
}

const qlikAppProps = (app, options) => {
  const currApp = {
    'app': app
  };

  if (options.includes('all') || options.includes('sheet')) {
    getSheetProps(app, (props) => {
      currApp['sheet'] = props
    })
  }
  if (options.includes('all') || options.includes('dimensionList')) {
    getDimension(app, (props) => {
      currApp['dimensionList'] = props
    })
  }
  if (options.includes('all') || options.includes('measureList')) {
    getMeasure(app, (props) => {
      currApp['measureList'] = props
    })
  }
  if (options.includes('all') || options.includes('bookmark')) {
    getBookmark(app, (props) => {
      currApp['bookmark'] = props
    })
  }
  if (options.includes('all') || options.includes('fields')) {
    getField(app, (props) => {
      currApp['fields'] = props
    })
  }
  if (options.includes('all') || options.includes('filters')) currApp['filters'] = app.selectionState();
  return currApp;
}

export default { getBookmark, getDimension, getField, getMeasure, getSheetProps, getMasterObj, getlist, getQlikObjectTitles, evaluateExpression, qlikAppProps }