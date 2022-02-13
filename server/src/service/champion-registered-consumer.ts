import { ContractEntity } from './../domain/contract.entity';
import { ContractDTO } from './dto/contract.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleRef } from '@nestjs/core';
import { Repository, getRepository } from 'typeorm';
// import { KafkaEntity } from '../domain/kafka.entity';

import { ConsumerService } from './consumer.service';

import { Injectable, OnModuleInit, forwardRef, Inject } from '@nestjs/common';
import { getManager } from "typeorm";



@Injectable()
export class ChampionRegisteredConsumer implements OnModuleInit {
    constructor( 
        @Inject(forwardRef(() => ConsumerService))
        private consumerService: ConsumerService,

        // @InjectRepository(EventCommandEntityRepository) private eventCommandEntityRepository: EventCommandEntityRepository,
        ) {}


    async onModuleInit() {
        const manager = getManager();
        const connection = manager.connection;
        const repository = connection.getRepository(ContractEntity)
        const contractDTO = new ContractDTO();
        await this.consumerService.consume({ topic: 'ChampionStateChanged' }, {
            eachMessage: async ({ topic, partition, message}) => {
                console.log({
                    value: message.value.toString(),
                    topic: topic.toString(),
                    partition: partition.toString(),
                });
               
                // const saved_message = JSON.parse(message.value.toString());

                // contractDTO.championID = saved_message["championID"];
                // contractDTO.vehicleID = saved_message["lastModifiedDate"];
                // contractDTO.hpAmount = 10;
                // contractDTO.duration = "Five years";
                // contractDTO.balance = 100000;
                // contractDTO.createdBy = saved_message["createdBy"];
                // contractDTO.status = "owing";
                // contractDTO.lastModifiedBy = saved_message["lastModifiedBy"];
                // contractDTO.lastModifiedDate = saved_message["lastModifiedDate"];
                
                // const new_contract = await repository.save(contractDTO)
                // console.log(new_contract)
            }
        });

        
    }
  
}

// export class KafkaService {
//     constructor(
    //   @InjectRepository(KafkaEntity) private readonly kafkaRepository: Repository<KafkaEntity>,
//       @Inject("KAFKA_SERVICE") private client: ClientKafka
//     ) {
//     }

//     async emit(topic: string[], key: string, value: any) {
//       for (let i = 0; i < topic.length; i++) {
//         await this.client.emit(topic, {
//           key,
//           value: JSON.stringify(value)
//         });
//       }
//     }
  
//     async save(data: any) {
//       return this.kafkaRepository.save(data);
//     }
//   }

