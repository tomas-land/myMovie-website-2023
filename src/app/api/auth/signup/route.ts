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

    // if credentials are valid, check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    // if user exists, return error
    if (existingUser) {
      return NextResponse.json(
        {
          error: 'A user with that email already exists',
        },
        {
          status: 422,
        }
      );
    }
    // if user doesn't exist, hash password and create user
    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { message: 'User created successfully' },
      {
        status: 200,
      }
    );
  } catch (error) {
    // if credentials are invalid, return error
    if (error instanceof z.ZodError) {
      console.error('Zod validation error:', error);
    } else {
      console.error('Server error:', error); 
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
