using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

public class QueryableList<T, TId> : List<T>, IQueryable<T>
{
    #region Constructors
    public QueryableList()
    { }

    public QueryableList(IEnumerable<T> source)
     : base(source)
    { }
    #endregion

    #region IQueryable<T> implementation
    public Expression Expression
    {
        get { return ToArray().AsQueryable().Expression; }
    }

    public Type ElementType
    {
        get { return typeof(T); }
    }

    public IQueryProvider Provider
    {
        get { return ToArray().AsQueryable().Provider; }
    }
    #endregion

    public void UpdateEntity(T entity)
    {
        var index = -1;

        for (var i = 0; i < Count; i++)
            if (this[i].Equals(entity))
                index = i;

        if (index == -1)
            Add(entity);
        else
            this[index] = entity;
    }
}