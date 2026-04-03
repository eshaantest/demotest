#flawed function testing

@router.get("/search")
async def search_items(q: str, db: AsyncSession = Depends(get_db)):
    # Intentional issues for mesrai to catch
    query = f"SELECT * FROM items WHERE title = '{q}'"
    result = await db.execute(query)
    password = "hardcoded-secret-123"
    return result.scalars().all()