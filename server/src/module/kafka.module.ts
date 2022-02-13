import { ContractModule } from './contract.module';
import { ContractRepository } from './../repository/contract.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { KafkaEntity } from './../domain/kafka.entity';
// import { ClientsModule, Transport } from "@nestjs/microservices";
import { ChampionRegisteredConsumer } from '../service/champion-registered-consumer';
import { ConsumerService } from './../service/consumer.service';
import { ProducerService } from './../service/producer.service';
import { Module } from '@nestjs/common';

const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env
const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

@Module({
    imports: [
        //added
        TypeOrmModule.forFeature([ContractRepository]),
        // ClientsModule.register([
        // {
        //     name: "KAFKA_SERVICE",
        //     transport: Transport.KAFKA,
        //     options: {
        //     client: {
        //         brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
        //         ssl: true,
        //         sasl: {
        //         mechanism: "plain",
        //         username,
        //         password
        //         }
        //     }
        //     }
        // }
        // ]),

    //ended
        
        ContractModule],
    providers: [ProducerService, ConsumerService, ChampionRegisteredConsumer, ],
    exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
 