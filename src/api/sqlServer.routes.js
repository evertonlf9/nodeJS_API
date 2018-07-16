/**
 * Created by everton.ferreira on 21/05/2018.
 */
class sqlServerAPI{
    constructor(){}

    static apis(app, cors, corsOptions, logger, _conn){
        this.connection = _conn;
        const self = this;

        app.get("/api/getServerType",cors(corsOptions), function(req,res) {

            self.request = req;
            self.response = res;
            self.sql = 'SELECT * FROM dbo.ServerType';
            self.connectionDB(porecedureSql);

        });
    }

    connectionDB ( ){
        //connection.connect().then(poolSql).then(porecedureSql).then(resultSql).catch(Error);
        this.connection.connect().then(this.poolSql).then(this.resultSql).catch(this.Error);
    }

    poolSql(pool) {
        // Query
        return pool.request()
            //.input('input_parameter', sqlServer.Int, value)
            //.query('select * from mytable where id = @input_parameter')
            .query(this.sql)
    }

    porecedureSql(result) {
        //console.dir(result);
        console.log(result);

        // Stored procedure
        //return pool.request()
        //    .input('input_parameter', sqlServer.Int, value)
        //    .output('output_parameter', sqlServer.VarChar(50))
        //    .execute('procedure_name')
    }

    resultSql(result) {
        this.response.json({ success: true, message:"", result: result.recordset});
        this.connection.close();
    }

    Error(err) {
        this.response.json({ success: false, message: err.message, result:[], type:"error" });
        this.connection.close();
    }
}
module.exports = sqlServerAPI;