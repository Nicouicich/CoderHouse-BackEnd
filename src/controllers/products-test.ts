import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';


faker.locale = 'en';

export const devolverAleatorios = (req: Request, res: Response) => {
    const respuesta = [];

    for(let i =0; i<5; i++){
        respuesta.push({
            nombre: faker.name.firstName(),
            apellido: faker.name.lastName(),
            color: faker.vehicle.color(),
            phone: faker.phone.phoneNumber('11-####-####'),
            email: faker.internet.email(),
        })
    }
    res.json({
        data: respuesta
    });
}