/*
@dev.mohe/indexeddb - Isomorphic interface for a database in the browser and nodejs.
Copyright (C) 2022 Moritz Hedtke <Moritz.Hedtke@t-online.de>
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

SPDX-FileCopyrightText: 2022 Moritz Hedtke <Moritz.Hedtke@t-online.de>
SPDX-License-Identifier: AGPL-3.0-or-later
*/

// https://www.w3.org/TR/IndexedDB/

// convert to class and create concrete subclasses?
export type Database = {
   objectStores: {
        [name: string]: {
            columns: readonly (string)[],
            indexes: readonly (string)[]
        }
    }
}

export function createObjectStore<SCHEMA extends Database, OBJECTSTORENAME extends string>(schema: SCHEMA, objectStore: OBJECTSTORENAME): SCHEMA & {
    objectStores: {
        [K in OBJECTSTORENAME]: {
            columns: readonly string[],
            indexes: readonly string[],
        }
    }
} {
    return {
        ...schema,
        objectStores: {
            [objectStore]: {
                columns: [] as const,
                indexes: [] as const
            }
        }
    }
}

export function createIndex(schema: Database, objectStore: string, indexName: String): Database {
    return schema
}

export function createColumn(schema: Database): Database {
    // no-op (except maybe default value) on indexeddb
    return schema
}

let schema = {
    objectStores: {}
} as const;

let finalSchema = createObjectStore(createObjectStore(schema, "test"), "jo");
