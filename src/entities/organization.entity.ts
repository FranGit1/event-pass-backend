import {Entity, Column, ManyToMany, OneToMany} from 'typeorm';
import {BaseEntity} from 'src/shared/base/base.entity';
import {Organizer} from './organizer.entity';
import {AutoMap} from "@automapper/classes";
import {Event} from "./event.entity";

@Entity()
export class Organization extends BaseEntity {
    @AutoMap()
    @Column()
    title: string;

    @AutoMap()
    @Column()
    keyword: string;

    @AutoMap()
    @Column({ name: 'legal_name', nullable: true })
    legalName: string;

    @AutoMap()
    @Column()
    slug: string;

    @AutoMap()
    @Column()
    organizerLogo: string;

    @AutoMap()
    @Column({nullable: true})
    organizerDescription: string;

    @AutoMap()
    @Column({nullable: true})
    organizerFacebook: string;

    @AutoMap()
    @Column({nullable: true})
    organizerLink: string;

    @AutoMap()
    @Column({nullable: true})
    organizerEmail: string;

    @AutoMap()
    @Column({nullable: true})
    organizerInstagram: string;

    @AutoMap()
    @ManyToMany(() => Organizer, organizer => organizer.organizations)
    organizers: Organizer[];


    @OneToMany(() => Event, event => event.organization)
    events: Event[];
}

