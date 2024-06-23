import {getConnectionDb} from '../utils/getConnectionDb.js';

function getNotifications(workerId) {
  return new Promise(async (resolve, reject) => {
    try {
        const db = await getConnectionDb();

        db.connect()
        .then(async () => {

            const query = `SELECT * FROM public."WorkerNotifications" ORDER BY created_at DESC; `;
            const response = await db.query(query);


            resolve(response.rows);
        })
        .catch((error) => {console.log(error); reject(error);});
    } catch (error) {
        reject(error);
    }
  });
}

function createNewNotification(notification) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await getConnectionDb();

            db.connect()
            .then(async () => {
                if(notification.id_offer === undefined)
                {
                  const query = `INSERT INTO public."WorkerNotifications" (worker_id, created_at, accepted_status) VALUES ('${notification.worker_id}', '${notification.created_at}', '${notification.accepted_status}') RETURNING *`;
                  const response = await db.query(query);
                  resolve(response.rows[0]);
                }
                else 
                {
                  const query = `INSERT INTO public."WorkerNotifications" (worker_id, created_at, id_offer, accepted_status) VALUES ('${notification.worker_id}', '${notification.created_at}', '${notification.id_offer}', '${notification.accepted_status}') RETURNING *`;
                  const response = await db.query(query);
                  resolve(response.rows[0]);
                }

            })
            .catch((error) => {console.log(error); reject(error);});
        } catch (error) {
            reject(error);
        }
    });
}

export {getNotifications, createNewNotification};