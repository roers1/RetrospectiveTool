using Moq;
using Retrospective_EFSQLRetrospectiveDbImpl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Retrospective_Core.Models;
using Retrospective_Core.Services;
using Xunit;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace Retrospective_Back_End_Test
{
	[TestClass]
	public class DatabaseTests
	{
		[Fact]
		public void CanCreateRetrospective()
		{
			var data = new List<Retrospective>
			{
				new Retrospective
				{
					Title = "Custom title 1",
					CreatedDate = new DateTime(2000, 1, 20),
					Description = "Custom description 1"
				},
				new Retrospective
				{
					Title = "Custom title 2",
					CreatedDate = new DateTime(2000, 1, 21),
					Description = "Custom description 2"
				},
				new Retrospective
				{
					Title = "Custom title 3",
					CreatedDate = new DateTime(2000, 1, 22),
					Description = "Custom description 3"
				}
			}.AsQueryable();

			var mockSet = new Mock<DbSet<Retrospective>>();
			mockSet.As<IQueryable<Retrospective>>().Setup(m => m.Provider).Returns(data.Provider);
			mockSet.As<IQueryable<Retrospective>>().Setup(m => m.Expression).Returns(data.Expression);
			mockSet.As<IQueryable<Retrospective>>().Setup(m => m.ElementType).Returns(data.ElementType);
			mockSet.As<IQueryable<Retrospective>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator);

			var mockContext = new Mock<IRetroRespectiveRepository>();
			mockContext.Setup(r => r.Retrospectives).Returns(mockSet.Object);

			var context = mockContext.Object;

			var retrospectives1 = context.Retrospectives.FirstOrDefault(r => r.Title == "Custom title 1");
			var retrospectives3 = context.Retrospectives.FirstOrDefault(r => r.Title == "Custom title 3");
			var retrospectives2 = context.Retrospectives.FirstOrDefault(r => r.Title == "Custom title 2");
			int count = context.Retrospectives.Count();

			Assert.AreEqual(count,3);
			Assert.AreEqual(retrospectives1.Title, "Custom title 1");
			Assert.AreEqual(retrospectives2.Title, "Custom title 2");
			Assert.AreEqual(retrospectives3.Title, "Custom title 3");
		}
	}
}
