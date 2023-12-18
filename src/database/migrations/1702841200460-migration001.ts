import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration0011702841200460 implements MigrationInterface {
    name = 'Migration0011702841200460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answer_entity" ("id" SERIAL NOT NULL, "score" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "participantId" integer, "questionId" integer, CONSTRAINT "PK_3158283e703015676d2e7c7d862" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "participant_entity" ("id" SERIAL NOT NULL, "streak" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, "quizId" integer, CONSTRAINT "PK_b3f0633bceda938d37730ca62be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "username" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "roleId" integer, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9b998bada7cff93fcb953b0c37" ON "user_entity" ("username") `);
        await queryRunner.query(`CREATE TYPE "public"."quiz_entity_status_enum" AS ENUM('upcoming', 'ongoing', 'completed')`);
        await queryRunner.query(`CREATE TABLE "quiz_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "status" "public"."quiz_entity_status_enum" NOT NULL DEFAULT 'upcoming', "startTime" TIMESTAMP, "endTime" TIMESTAMP, "streakBonus" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_49aa5018c097da2f6c16121c4f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question_entity" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "quizId" integer, CONSTRAINT "PK_14a0a509f33d8cd3a96a448dcd7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "option_entity" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "isCorrect" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "questionId" integer, CONSTRAINT "PK_50faaabc2312180c7831b4f993d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `);
        await queryRunner.query(`CREATE TABLE "answer_entity_options_option_entity" ("answerEntityId" integer NOT NULL, "optionEntityId" integer NOT NULL, CONSTRAINT "PK_b4ab90da09fbd9955921b7956a5" PRIMARY KEY ("answerEntityId", "optionEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6f15f2e68f0b89ab783d234b99" ON "answer_entity_options_option_entity" ("answerEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7a4d89a9126cf42b6e4f85e464" ON "answer_entity_options_option_entity" ("optionEntityId") `);
        await queryRunner.query(`ALTER TABLE "answer_entity" ADD CONSTRAINT "FK_1decafd8770736d91d4634ffb61" FOREIGN KEY ("participantId") REFERENCES "participant_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer_entity" ADD CONSTRAINT "FK_46f9a8790125a0d72234dda1614" FOREIGN KEY ("questionId") REFERENCES "question_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participant_entity" ADD CONSTRAINT "FK_f67fccd5a518e208737d7023988" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participant_entity" ADD CONSTRAINT "FK_ad3e770e03069ed8de13bcffabc" FOREIGN KEY ("quizId") REFERENCES "quiz_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_95ab8e7157a5bb4bc0e51aefdd2" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_entity" ADD CONSTRAINT "FK_75913dd5fe69969145949d3a80f" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_entity" ADD CONSTRAINT "FK_f9fe3f64d4d2c5e6179b2af1a69" FOREIGN KEY ("quizId") REFERENCES "quiz_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "option_entity" ADD CONSTRAINT "FK_80476249b1664ccce933b5e1c13" FOREIGN KEY ("questionId") REFERENCES "question_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer_entity_options_option_entity" ADD CONSTRAINT "FK_6f15f2e68f0b89ab783d234b991" FOREIGN KEY ("answerEntityId") REFERENCES "answer_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "answer_entity_options_option_entity" ADD CONSTRAINT "FK_7a4d89a9126cf42b6e4f85e4641" FOREIGN KEY ("optionEntityId") REFERENCES "option_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer_entity_options_option_entity" DROP CONSTRAINT "FK_7a4d89a9126cf42b6e4f85e4641"`);
        await queryRunner.query(`ALTER TABLE "answer_entity_options_option_entity" DROP CONSTRAINT "FK_6f15f2e68f0b89ab783d234b991"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`ALTER TABLE "option_entity" DROP CONSTRAINT "FK_80476249b1664ccce933b5e1c13"`);
        await queryRunner.query(`ALTER TABLE "question_entity" DROP CONSTRAINT "FK_f9fe3f64d4d2c5e6179b2af1a69"`);
        await queryRunner.query(`ALTER TABLE "quiz_entity" DROP CONSTRAINT "FK_75913dd5fe69969145949d3a80f"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_95ab8e7157a5bb4bc0e51aefdd2"`);
        await queryRunner.query(`ALTER TABLE "participant_entity" DROP CONSTRAINT "FK_ad3e770e03069ed8de13bcffabc"`);
        await queryRunner.query(`ALTER TABLE "participant_entity" DROP CONSTRAINT "FK_f67fccd5a518e208737d7023988"`);
        await queryRunner.query(`ALTER TABLE "answer_entity" DROP CONSTRAINT "FK_46f9a8790125a0d72234dda1614"`);
        await queryRunner.query(`ALTER TABLE "answer_entity" DROP CONSTRAINT "FK_1decafd8770736d91d4634ffb61"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7a4d89a9126cf42b6e4f85e464"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6f15f2e68f0b89ab783d234b99"`);
        await queryRunner.query(`DROP TABLE "answer_entity_options_option_entity"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "option_entity"`);
        await queryRunner.query(`DROP TABLE "question_entity"`);
        await queryRunner.query(`DROP TABLE "quiz_entity"`);
        await queryRunner.query(`DROP TYPE "public"."quiz_entity_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9b998bada7cff93fcb953b0c37"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "participant_entity"`);
        await queryRunner.query(`DROP TABLE "answer_entity"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
