import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '@/lib/prisma/prisma';
import z from 'zod';
import { credentialsSchema } from '@/lib/zod/user/signupSchema';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    const credentials = { username, email, password };
    credentialsSchema.parse(credentials); // Validate credentials

    const existingUser = await prisma.user.findUnique({
      //if credentials are valid, check if user already exists
      where: { email },
    });
    if (existingUser) {
      //if user exists, return error
      return NextResponse.json(
        {
          error: 'A user with that email already exists',
        },
        {
          status: 422,
        }
      );
    }
  
    const hashedPassword = await hash(password, 10); // if user doesn't exist, hash password and create user

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      
      {message: 'User created successfully'},
      {
        status: 200
      }
      
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      // if credentials are invalid, return error
      console.error('Zod validation error:', error);
    } else {
      console.error('Server error:', error); // if server error, return error
    }

    return NextResponse.json(
      {
        error: 'An error occurred',
      },
      {
        status: 500,
      }
    );
  }
}
