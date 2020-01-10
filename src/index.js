import 'babel-polyfill';
import { qlikConnection, QSProps, helper } from './qlik';

const TSQlik = (config) => {
  return new Promise((resolve, reject) => {
    try {
      if (QSProps['qlik']) {
        resolve(QSProps);
      } else {
        qlikConnection(config).then(q => {
          QSProps['qlik'] = q;
          QSProps['global'] = q.getGlobal(config);
          QSProps['global'].getAuthenticatedUser((reply) => {
            let user = reply.qReturn ? reply.qReturn.split(';') : null;
            var users = {
              directory: user ? user[0].split('=')[1] : null,
              userid: user ? user[1].split('=')[1] : null,
              authUser: reply
            };
            QSProps['qlikUser'] = users;
            resolve(QSProps);
          })
        })
      }
    } catch (error) {
      reject(error);
    }
  })
}

const QSApp = (appId, config, options = ['all']) => {
  return new Promise((resolve, reject) => {
    try {
      TSQlik(config).then((q) => {
        var app = QSProps['qlik'].openApp(appId, config);
        QSProps['currApp'] = helper.qlikAppProps(app, options)
        resolve(QSProps);
      }).catch((err) => {
        reject(err);
      })
    } catch (err) {
      reject(err)
    }
  })
}

export { TSQlik, QSApp, QSProps };