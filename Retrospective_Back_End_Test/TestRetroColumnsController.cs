using Moq;
using Retrospective_Back_End.Controllers;
using Retrospective_Core.Models;
using Retrospective_Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Retrospective_Back_End_Test
{
    public class TestRetroColumnsController
    {
	    readonly Mock<IRetroRespectiveRepository> _mockRetrospectiveRepo;

	    public TestRetroColumnsController()
        {
            this._mockRetrospectiveRepo = new Mock<IRetroRespectiveRepository>();
        }

        [Fact]
        public void AdditionOfAColumn()
        {
            //Arrange
            IRetroRespectiveRepository repo = _mockRetrospectiveRepo.Object;
            var controller = new RetroColumnsController(repo);

            IList<RetroColumn> columns = new List<RetroColumn>();

            void Action(RetroColumn retroColumn)
            {
	            columns.Add(retroColumn);
            }

            _mockRetrospectiveRepo.Setup(m => m.SaveRetroColumn(It.IsAny<RetroColumn>())).Callback((Action<RetroColumn>) Action);

            //Act
            controller.PostRetroColumn(new RetroColumn
            {
                Id = 2,
                Title = "Column 3"
            });

            //Assert
            Assert.True(columns.Any());

            RetroColumn createdColumn = columns.FirstOrDefault(r => r.Title.Equals("Column 3"));

            Assert.NotNull(createdColumn);
        }

        [Fact]
        public void DeletionOfAColumn()
        {
            //Arrange
            RetroColumn column = new RetroColumn
            {
                Id = 0,
                Title = "Column 1"
            };

            IList<RetroColumn> columns = new List<RetroColumn> {
                column
            };

            void Action(RetroColumn retroColumn)
            {
	            columns.Remove(retroColumn);
            }


            _mockRetrospectiveRepo.Setup(m => m.RetroColumns).Returns(columns.AsQueryable());
            _mockRetrospectiveRepo.Setup(m => m.RemoveRetroColumn(It.IsAny<RetroColumn>())).Callback((Action<RetroColumn>) Action);

            IRetroRespectiveRepository repo = _mockRetrospectiveRepo.Object;
            var controller = new RetroColumnsController(repo);

            //Act
            controller.DeleteRetroColumn(0);

            //Assert
            Assert.True(!columns.Any());
        }

        [Fact]
        public void EditingOfAColumn()
        {
            //Arrange


            RetroColumn column = new RetroColumn
            {
                Id = 0,
                Title = "Column 1"
            };

            IList<RetroColumn> columns = new List<RetroColumn> {
                column
            };

            void Action(RetroColumn retroColumn)
            {
	            RetroColumn retroColumnAction = columns.Where(r => r.Id == 0).Select(rc => rc).SingleOrDefault();
	            if (retroColumnAction != null) retroColumnAction.Title = "Column 2";
            }

            _mockRetrospectiveRepo.Setup(m => m.UpdateRetroColumn(It.IsAny<RetroColumn>())).Callback((Action<RetroColumn>)Action);

            IRetroRespectiveRepository repo = _mockRetrospectiveRepo.Object;

            var controller = new RetroColumnsController(repo);

            //Act
            controller.PutRetroColumn(0, column);

            //Assert
            Assert.Equal("Column 2", columns.Where(r => r.Id == 0).Select(rc => rc).SingleOrDefault()?.Title);
        }
    }
}
