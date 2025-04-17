import { usersStub, User } from "../stub/user.stub"

const getAllUsers = (): User[] => {
    try {
        return usersStub;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const addUser = (name: string, age: number): User[] => {
    try {
        usersStub.push({ name, age })
        return usersStub;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const getUserAvg = (): number => {
    try {
        const avg = usersStub.reduce((acc, currentUser, index) => {
            acc += currentUser.age
            if (index === usersStub.length - 1) {
                return acc / usersStub.length
            }
            return acc
        }, 0)
        return avg
    } catch (error: any) {
        throw new Error(error.message)
    }

}

const getUsersOlderThenAge = (age: number) => {
    try {
        return usersStub.filter(user => user.age > age);
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const updateUserAge = (name: string, age: number): boolean => {
    try {
        const user = usersStub.find(user => user.name === name);
        if (user) {
            user.age = age;
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export { getAllUsers, getUserAvg, addUser, getUsersOlderThenAge, updateUserAge }
