exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable("message", table => {
      table
        .integer("error_code")
        .nullable()
        .default(null);
      table.dropColumn("service_response");
      table.dropIndex("user_number");
    }),
    knex.schema.alterTable("campaign_contact", table => {
      table
        .integer("error_code")
        .nullable()
        .default(null);
    }),
    knex.schema.alterTable("log", table => {
      table
        .integer("error_code")
        .nullable()
        .default(null);
      table
        .string("from_num", 15)
        .nullable()
        .default(null);
      table
        .string("to_num", 15)
        .nullable()
        .default(null);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable("message", table => {
      table.dropColumn("error_code");
      table
        .text("service_response")
        .notNullable()
        .defaultTo("");
      table.index("user_number");
    }),
    knex.schema.alterTable("campaign_contact", table => {
      table.dropColumn("error_code");
    }),
    knex.schema.alterTable("log", table => {
      table.dropColumn("error_code");
    })
  ]);
};
