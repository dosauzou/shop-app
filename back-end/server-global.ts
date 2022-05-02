const mysql = require('mysql');

import { Connection, Query } from 'mysql';
var toUnnamed = require('named-placeholders')();


export default class Mysql {
  private connection!: Connection;

  private static INSTANCE: Mysql;

  public static getInstance(): Mysql {
    if (!this.INSTANCE) {
      this.INSTANCE = new Mysql();
    }
    return Mysql.INSTANCE;
  }

  private constructor() {
    this.connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "ShopApp"
    });

    this.connect();
  }

  connect() {
    this.connection.connect();
  }

  query(sqlString: string, values : string []= []): Promise<Query> {
    return new Promise(async (resolve, reject) => {
      try {
        return this.connection.query(sqlString, values, (err, results) => {
          if (err) {
            console.log(err)
            return reject(err);
          }

          return resolve(results)
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  namedQuery(sqlString: string, values: {}): Promise<Query> {
    const [query, queryValues] = toUnnamed(sqlString, values);
    return this.query(query, queryValues);
  }

  beginTransaction() {
    return new Promise((resolve, reject) => {
      try {
        this.connection.beginTransaction((err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  commit() {
    return new Promise((resolve, reject) => {
      try {
        this.connection.commit();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  rollback() {
    return new Promise((resolve, reject) => {
      try {
        this.connection.rollback();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  release() {
    return new Promise((resolve, reject) => {
      try {
        if (this.connection) {
          this.connection.end();
        }
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
}